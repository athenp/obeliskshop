<?php
    $post = $_SERVER['REQUEST_METHOD']=='POST';
    
    if ($post) {
        if(
           empty($_POST['fname'])||
           empty($_POST['lname'])||
           empty($_POST['email'])
           ) $empty_fields = true;
        
        else {
            $fnmatch = preg_match('/^[A-Za-z]+$/', $_POST['fname']);
            $lnmatch = preg_match('/^[A-Za-z]+$/', $_POST['lname']);
            $emmatch = preg_match('/^[A-Za-z_0-9]+@[A-Za-z]+.[A-Za-z]+$/', $_POST['email']);
        }
    }
?>

<!doctype html>
<html>
    <head>
        <title>CRH Captcha</title>
        <link href="css/loginstyle.css" rel="stylesheet" />
    </head>
    <body>
        <div id="content">
            <div id="stuff">
                <div id="box">
                    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
                        <p>Enter your name, email and the captcha from the poster.</p>
<?php
    echo 'Name<br><input type="text" name="fname" value="'.$_POST['fname'].'" placeholder="First Name"><br>';
    echo '<input type="text" name="lname" value="'.$_POST['lname'].'" placeholder="Last Name"><br>';
    if($post&&!$empty_fields&&!($lnmatch&&$fnmatch)) echo '<span>error: name contains a non-alphabet character.<br></span>';
    echo '<br>Email<br><input type="text" name="email" value="'.$_POST['email'].'" placeholder="email@example.com"><br>';
    //if(!empty($email_err)&&$email_err) echo '<span>error: email already registered.</span>';
    if($post&&!$empty_fields&&!$emmatch) echo '<span>error: email not of format example@site.domain<br></span>';
    ?>
<input type="submit" id="submit" value="Register"><br><br>
<?php
if($post &&$empty_fields) echo "<br><span>error: all fields not completed.</span><br>";
?>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
