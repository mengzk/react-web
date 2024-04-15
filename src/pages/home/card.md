
3d卡片移出效果

```jsx
<div className="image-card">
    <img className="image-card-img" src="https://images.pexels.com/photos/19283359/pexels-photo-19283359.jpeg" />
    <img className="image-card-mark" src="https://pic2.zhimg.com/v2-b060580d8dadc9500d994675c66938b3_r.jpg" />
</div>
```

```css
.image-card {
  width: 90px;
  height: 120px;
  position: relative;
}

.image-card img {
  width: 90px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  position: absolute;
  transition: 0.7s;
}

.image-card-img  {
  left: 0;
  bottom: 0;
}
.image-card:hover .image-card-img {
  box-shadow: 0 24px 24px -8px rgba(0, 0, 0, 0.5);
  transform: perspective(300px) rotateX(20deg);
}
.image-card-mark  {
  opacity: 0;
  z-index: 2;
}

.image-card:hover .image-card-mark {
  opacity: 1;
  transform: perspective(300px) translate3d(0, -30px, 30px);
}
```