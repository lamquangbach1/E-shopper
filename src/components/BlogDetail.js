import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogContent from "../blogComment/BlogContent";
import BLogRating from "../blogComment/BlogRating";
import BlogComments from "../blogComment/BlogComments";

function BlogDetail() {
   let params = useParams()    //ấy id của bài viết từ URL (nhờ useParams)
   const [data, setData] = useState({})   // chứa dữ liệu của bài viết
   const [comments, setComments] = useState([])  //chứa danh sách các bình luận của bài viết
   const [comment, setComment] = useState('')   //quản lý nội dung của bình luận mới mà người dùng nhập vào
   const [parentCommmentId, setParentCommmentId] = useState(0)
   const loginInfo = localStorage.getItem("loginInfo")

   const handleReplay = (id) => {
      setParentCommmentId(id)   // đặt ID bình luận cha
      localStorage.setItem("id_comment", id)  // lưu id cmt vào localStorage
   }
   useEffect(() => {
      axios.get('http://localhost/laravel8/laravel8/public/api/blog/detail/' + params.id)
         .then(response => {
            console.log(response)
            setData(response.data.data)  //Lưu dữ liệu bài viết vào state data.
            setComments(response.data.data.comment) //Lưu danh sách bình luận vào state comments.
         })
         .catch(error => console.log(error))
   },[])

   const loginInfoObj = JSON.parse(loginInfo)
   const accessToken = loginInfoObj.token

   const postComment = () => {
      if (!loginInfo) {
         alert("Vui lòng đăng nhập")
         return
      }


      if (!comment.length) {
         alert("Vui lòng nhập bình luận")
         return
      } else {
         const formData = new FormData() //chứa thông tin bình luận
         formData.append('id_blog', params.id)
         formData.append('id_user', loginInfoObj.Auth.id)
         formData.append('id_comment', parentCommmentId)
         // formData.append('id_comment',idRep ? idRep : 0 )
         formData.append('comment', comment)
         formData.append('image_user', loginInfoObj.Auth.avatar)
         formData.append('name_user', loginInfoObj.Auth.name)

         let config = {  //Cấu hình yêu cầu POST
            headers: {
               'Authorization': 'Bearer ' + accessToken,
               'Content-Type': 'application/x-www-form-urlencoded',
               //'Content-Type': 'application/json',
               'Accept': 'application/json'
            }
         }

         // const formData = {
         //    id_blog: params.id,
         //    id_user: loginInfoObj.Auth.id,
         //    id_comment: localStorage.getItem("id_comment") || 0,
         //    comment: comment,
         //    image_user: loginInfoObj.Auth.avatar,
         //    name_user: loginInfoObj.Auth.name
         // }

         axios.post("http://localhost/laravel8/laravel8/public/api/blog/comment/" + params.id, formData, config)
            .then((response) => {
               console.log(response) // co chưa binh luan mới nhất  
               const newComments = response.data.data   //cmt mới đc trả về ở respone.da
               const updatComments = comments.concat(newComments)
               setComments(updatComments)
               setComment('')
               localStorage.removeItem('id_comment')  // Xóa id_comment trong localStorage sau khi gửi thành công

               // axios.get('http://localhost/laravel8/laravel8/public/api/blog/detail/' + params.id)
               // .then(response1 =>{
               //    setComments(response1.data.data.comment)
               //    setComment('')
               //    localStorage.removeItem('id_comment')
               // })          
            })
            .catch(function (error) {
               console.log(error)
            })
      }
   }
   return (

      <div class="col-sm-9">
         <BlogContent data={data} />
         <BLogRating />
         <div class="socials-share">
            <a href=""><img src="images/blog/socials.png" alt="" /></a>
         </div>
         <div class="media commnets">
            <a class="pull-left" href="#">
               <img class="media-object" src="images/blog/man-one.jpg" alt="" />
            </a>
            <div class="media-body">
               <h4 class="media-heading">Annie Davis</h4>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
               <div class="blog-socials">
                  <ul>
                     <li><a href=""><i class="fa fa-facebook"></i></a></li>
                     <li><a href=""><i class="fa fa-twitter"></i></a></li>
                     <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                     <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                  </ul>
                  <a class="btn btn-primary" href="">Other Posts</a>
               </div>
            </div>
         </div>
         <BlogComments comments={comments} onReplay={handleReplay} />
         <div class="replay-box">
            <div class="row">
               <div class="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div class="text-area">
                     <div class="blank-arrow">
                        <label>Your Name</label>
                     </div>
                     <span>*</span>
                     <textarea id="comment-textarea" value={comment} onChange={(e) => setComment(e.target.value)} name="message" rows="11" placeholder="Nhập bình luận của bạn"></textarea>
                     <a class="btn btn-primary" onClick={postComment}>post comment</a>
                  </div>
               </div>
            </div>
         </div>
      </div>

   );
}

export default BlogDetail;