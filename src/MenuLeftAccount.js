
import { Link } from "react-router-dom";
function MenuLeftAccount() {
    return (
        <div className="col-sm-3">
        <div class="left-sidebar">
        <h2>Account</h2>
        <div class="panel-group category-products" id="accordian">           
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title"><a href="#">account</a></h4>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    {/* <h4 class="panel-title"><a href="#">My product</a></h4>  */}
                    <Link to={`/account/product/list`}><a href="#"> My Product</a> </Link>
                </div>
            </div>
            
        </div>					
    </div>
    </div>
    );
  }
  
  export default MenuLeftAccount;