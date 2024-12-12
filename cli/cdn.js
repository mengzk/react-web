const { createHmac } = require("crypto");
const qs = require("qs");
const axios = require("axios");

const CDN_SERVER = "https://cdn.aliyuncs.com";

class CDN {
  cdnKey;
  cdnSecret;
  cdnServer = CDN_SERVER;
  cdnVersion;
  constructor({ cdnKey, cdnSecret, cdnVersion = "2018-05-10" }) {
    this.cdnKey = cdnKey;
    this.cdnSecret = cdnSecret;
    this.cdnVersion = cdnVersion;
  }

  percentEncode(str) {
    return encodeURIComponent(str)
      .replace("+", "%20")
      .replace("*", "%2A")
      .replace("%7E", "~");
  }

  computeSignature(parameters, method) {
    let canonicalStr = "";
    Object.keys(parameters)
      .sort()
      .forEach((key) => {
        canonicalStr +=
          "&" +
          this.percentEncode(key) +
          "=" +
          this.percentEncode(parameters[key]);
      });
    const signStr =
      `${method.toUpperCase()}&${this.percentEncode("/")}&` +
      this.percentEncode(canonicalStr.slice(1));
    // console.debug("signStr:",signStr)
    return createHmac("sha1", this.cdnSecret + "&")
      .update(signStr)
      .digest()
      .toString("base64");
  }

  resolveParams(method, requestParams) {
    const parameters = {
      Format: "JSON",
      Version: this.cdnVersion,
      AccessKeyId: this.cdnKey,
      SignatureVersion: "1.0",
      SignatureMethod: "HMAC-SHA1",
      SignatureNonce: String(Math.random()).slice(2),
      Timestamp: new Date().toISOString(),
    };
    parameters["Signature"] = this.computeSignature(
      { ...parameters, ...requestParams },
      method
    );
    return { ...parameters, ...requestParams };
  }

  req(method, requestParams) {
    const url =
      this.cdnServer +
      "?" +
      qs.stringify(this.resolveParams(method, requestParams), false);
    return axios
      .get(url)
      .then(({ statusCode, data, headers }) => {
        let result;
        try {
          result = JSON.parse(data.toString());
        } catch (e) {
          result = data;
        }
        return {
          statusCode,
          data: result,
          headers,
        };
      })
      .catch((err) => {
        console.log("errrr", err.response.data);
      });
  }
}

class AliYunCDN extends CDN {
  combineUrl(url) {
    return url instanceof Array ? (url.length > 1 ? url.join("\n") : url) : url;
  }

  /**
   * 刷新url
   * @param url
   */
  refreshUrl(url) {
    return this.req("get", {
      Action: "RefreshObjectCaches",
      ObjectPath: this.combineUrl(url),
      ObjectType: "File",
    });
  }

  /**
   * 刷新目录
   * @param dir
   */
  refreshDir(dir) {
    return this.req("get", {
      Action: "RefreshObjectCaches",
      ObjectPath: this.combineUrl(dir),
      ObjectType: "Directory",
    });
  }

  /**
   * 预热url
   * @param url
   * @param area
   */
  pushUrl(url, area = "domestic") {
    return this.req("get", {
      Action: "PushObjectCache",
      ObjectPath: this.combineUrl(url),
      Area: area,
    });
  }

  /**
   * 查询配额信息
   */
  describeQuota() {
    return this.req("get", {
      Action: "DescribeRefreshQuota",
    });
  }

  /**
   * 查询刷新预热信息
   * @param params
   */
  describeTasks(params = {}) {
    return this.req("get", {
      Action: "DescribeRefreshTasks",
      ...params,
    });
  }
}

function refreshCDN(env, project) {
  const cdn = new AliYunCDN({
    cdnKey: "", // 阿里云accessKeyId
    cdnSecret: "", // 阿里云accessKeySecret
  });
  const url = `https://test.com/${env}/web/${project}/index.html`
  console.log("refresh cnd:", url);
  return cdn.refreshUrl(url);
}

module.exports = {
  refreshCDN
}