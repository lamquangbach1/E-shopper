// App.js
import React from 'react';

function BlogComments(props) {

  const handleReplay = (parentID) => {
    localStorage.setItem("id_comment", parentID)
    props.onReplay(parentID)    //giúp thông báo cho component cha rằng người dùng đang muốn trả lời bình luận nào.
    const textarea = document.getElementById('comment-textarea'); 
    textarea.focus(); // Focus vào textarea
    textarea.scrollIntoView({ behavior: 'smooth' });
  }
  

  // const renderChildComment = (childs) => {
     // const id_comment = comment.id_comment
      // if(id_comment != 0 ) return null // check nếu comment con
      // const id = comment.id
      // const childs = props.comments.filter(child => child.id_comment == id) //tim then con có id_comment == id
  //   return childs.map(child => {
  //     return (
  //     <li className="media second-media">
  //         <a className="pull-left" href="#">
  //           <img className="media-object" src="images/blog/man-three.jpg" alt="" />
  //         </a>
  //         <div className="media-body">
  //           <ul className="sinlge-post-meta">
  //             <li><i className="fa fa-user"></i> {child.name_user}</li>
  //             <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
  //             <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
  //           </ul>
  //           <p>{child.comment}</p>
  //           <span onClick={()=> replyComment(child.id_comment)} className="btn btn-primary"><i className="fa fa-reply" ></i> Reply</span>
  //         </div>
  //       </li>
  //     )
  //   })
  // }

  const renderChildComment = (id) => {
    return props.comments.filter(child => child.id_comment === id)  // tìm bình luận con
      .map(child => (
        <li className="media second-media" key={child.id}>
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user"></i> {child.name_user}</li>
              <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
              <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
            </ul>
            <p>{child.comment}</p>
            <span onClick={() => handleReplay(child.id)} className="btn btn-primary"><i className="fa fa-reply" ></i> Reply</span>

          </div>
        </li>
      ))
  }

  const renderComments = () => {
    return props.comments.map(comment => {
      if (comment.id_comment === 0) {
        return (
          <>
            <li className="media" key={comment.id}>
              <a className="pull-left" href="#">
                <img className="media-object" src="images/blog/man-two.jpg" alt="" />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li><i className="fa fa-user"></i> {comment.name_user}</li>
                  <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                  <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                </ul>
                <p>{comment.comment}</p>
                <span onClick={() => handleReplay(comment.id)} className="btn btn-primary"><i className="fa fa-reply"  ></i> Reply</span>
              </div>
            </li>
            {renderChildComment(comment.id)}
          </>

        )
      }
     
    })
  }
  return (
    <div className="response-area">
      <h2>{props.comments.length} RESPONSES</h2>
      <ul className="media-list">
        {renderComments()}

        {/* <li className="media second-media">
          <a className="pull-left" href="#">
            <img className="media-object" src="images/blog/man-three.jpg" alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta">
              <li><i className="fa fa-user"></i> Janis Gallagher</li>
              <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
              <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <a className="btn btn-primary" href=""><i className="fa fa-reply"></i> Reply</a>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

export default BlogComments;



// co nhieu CMt cha
//   1 cha có nhieu con


// map.(...){


//   if(id_comment==0){
//     return Li cha
//   }

// }


  // - click reply thi lay id cha ra
  // - truyen id cha lên detail
  // - set id cha nay formdata cho id_comment  de gui data qua backend