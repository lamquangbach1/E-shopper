import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Blog() {

	const [blogs, setBlogs] = useState([])
	useEffect(()=> {
		axios.get('http://localhost/laravel8/laravel8/public/api/blog')
		.then(function (response) {
			console.log(response)
			setBlogs([...response?.data?.blog?.data] || [])
		})
		.catch(function (error) {
			console.log(error);
		})		
	}, [])

	const renderBlogs = ()=>{
		const response = blogs.map(blog => {
			const updateAt = blog.updated_at
			const [date, timeWithMilliseconds] = updateAt.split('T');
			const time = timeWithMilliseconds.split('.')[0];
			return (
				<div class="single-blog-post" key={blog.id}>
							<h3>{blog.title}</h3>
							<div class="post-meta">
								<ul>
									<li><i class="fa fa-user"></i> Mac Doe</li>
									<li><i class="fa fa-clock-o"></i> {time}</li>
									<li><i class="fa fa-calendar"></i> {date}</li>
								</ul>
								<span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span>
							</div>
							<a href="">
								<img src={'http://localhost/laravel8/laravel8/public/upload/blog/image/' + blog.image} alt=""/>
							</a>
							<p>{blog.description}</p>
							{/* <a  class="btn btn-primary" href="">Read More</a> */}
							<Link to={`/blog/detail/${blog.id}`}>Read More</Link>
						</div>
			)
		})
		return response
	}

    return (
     
					
				<div class="col-sm-9">
					<div class="blog-post-area">
						<h2 class="title text-center">Latest From our Blog</h2>
						{renderBlogs()}					
						<div class="pagination-area">
							<ul class="pagination">
								<li><a href="" class="active">1</a></li>
								<li><a href="">2</a></li>
								<li><a href="">3</a></li>
								<li><a href=""><i class="fa fa-angle-double-right"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			
      
    );
  }
  
  export default Blog;