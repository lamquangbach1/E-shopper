
import { useEffect, useState } from "react";

import axios from "axios";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
function Rate() {
    const[rating,setRating] = useState(0)   //giá trị rating trung bình
    // const [newRating, setNewRating] = useState(0);  //rating mới từ người dùng
    let params = useParams(); // Lấy id của bài viết từ URL
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"))
    useEffect(() => {        //gọi api lấy các danh sách đánh giá(ratings) từ backend dựa trên id của bài viết
        if(!loginInfo){
            alert("Vui lòng đăng nhập ")
            return
        }
        axios.get('http://localhost/laravel8/laravel8/public/api/blog/rate/' + params.id)        
        .then(respone => {
            console.log(respone)
            const listRatings = respone.data.data   //lấy danh sách các đánh giá phản hồi từ api
            if(listRatings.length > 0){
                 const averageRating = listRatings.reduce((sum, rating) => sum + rating.rate, 0) / listRatings.length; //tính tổng tất cả các điểm đánh giá (rating.rate) trong danh sách và sau đó chia tổng đó cho số lượng đánh giá (ratings.length) => giá trị trung bình
                //  console.log(totalRating)
                 setRating(averageRating)  //cap nhat state rating với đánh giá trung bình
            }
        })
        .catch(function (error) {
            console.log(error)
         })
    },[])


    function changeRating(newRating,name){ //khi người dùng thay đổi đánh giá (gửi đánh giá lên server và cập nhật lại giá trị điểm trung bình sau khi đánh giá thành công.)
        if (!loginInfo) {
            alert("Vui lòng đăng nhập để đánh giá!");
            return;  
        }
        setRating(newRating)  //cập nhất giá trị rating mới
        const formData = new FormData()
        formData.append('blog_id',params.id)
        formData.append('user_id',loginInfo.Auth.id)
        formData.append('rate',newRating)

        let config = {
            headers: {
                'Authorization': 'Bearer ' + loginInfo.token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        axios.post("http://localhost/laravel8/laravel8/public/api/blog/rate/" + params.id, formData, config) //post để lưu đánh giá lên server
        .then(respone =>{
            console.log(respone.data)
            alert("Bạn đã đánh giá thành công!")
            axios.get('http://localhost/laravel8/laravel8/public/api/blog/rate/' + params.id) //cập nhật lại rating trung bình khi đánh giá thành công
            .then(respone =>{
                const listRatings = respone.data.data
                if(listRatings.length > 0){
                    const averageRating = listRatings.reduce((sum, rating) => sum + rating.rate, 0) / listRatings.length;
                    setRating(averageRating)
                }
            })
            .catch(function (error) {
                console.log(error)
             })
        })
    }
    return (
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={changeRating}
          numberOfStars={5}
          name='rating'
        />
      );
  }
  
  export default Rate;