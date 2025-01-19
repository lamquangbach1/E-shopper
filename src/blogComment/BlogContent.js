// App.js
import React from 'react';

function BlogContent(props) {
  return (
    <div className="blog-post-area">
      <h2 className="title text-center">Latest From our Blog</h2>
      <div className="single-blog-post">
        <h3>{props.data.title}</h3>
        <div className="post-meta">
          <ul>
            <li><i className="fa fa-user"></i> Mac Doe</li>
            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
            <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
          </ul>
          <span>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
          </span>
        </div>
        <a href="">
          <img src={'http://localhost/laravel8/laravel8/public/upload/blog/image/' + props.data.image} alt="" />
        </a>
        <div dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
        <div className="pager-area">
          <ul className="pager pull-right">
            <li><a href="#">Pre</a></li>
            <li><a href="#">Next</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BlogContent;
