// App.js
import React from 'react';
import Rate from '../Rate';



function BLogRating() {
  return (
    <div class="rating-area">
    {/* <ul class="ratings">
        <li class="rate-this">Rate this item:</li>
        <li>
            <i class="fa fa-star color"></i>
            <i class="fa fa-star color"></i>
            <i class="fa fa-star color"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </li>
        <li class="color">(6 votes)</li>
    </ul> */}
    <Rate></Rate>
    <ul class="tag">
        <li>TAG:</li>
        <li><a class="color" href="">Pink <span>/</span></a></li>
        <li><a class="color" href="">T-Shirt <span>/</span></a></li>
        <li><a class="color" href="">Girls</a></li>
    </ul>
</div>
  );
}

export default BLogRating;
