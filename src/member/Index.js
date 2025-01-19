import Login from './Login'
import Register from './Register';
function Index() {
    return (
		<>
		
				<div class="col-sm-4 col-sm-offset-1">
					<Login></Login>
				</div>
				<div class="col-sm-1">
					<h2 class="or">OR</h2>
				</div>
				<div class="col-sm-4">
					<Register/>
				</div>
				</>
    )
	
  }
  
  export default Index;