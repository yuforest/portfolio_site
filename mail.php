<?php
  mb_language("Japanese");
  mb_internal_encoding("UTF-8");
  if(!$_POST){
  header('Location: /');
  }
  session_start();
  if(isset($_POST['name'],$_POST['email'],$_POST['content'])){
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['content'] = $_POST['content'];
  }
?>

<!DOCTYPE html>
<html lang="ja" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      $action = $_POST['action'];
      $name = htmlspecialchars($_SESSION['name']);
      $email = htmlspecialchars($_SESSION['email']);
      $comment = htmlspecialchars($_SESSION['content']);
      $to = 'lostforest0@gmail.com';
      $subject = 'お問い合わせ';
      $message = '[お名前]'."\n".$name."\n";
      $message .= '[email]'."\n".$email."\n";
      $message .= '[コメント]'."\n".$comment."\n\n\n";
      $header = 'From: '.$email."\r\n";
      $header .= 'Reply-To: '.$email."\r\n";
      if($action == "post"){
        echo '<h3 class="text-center mt-5">コンタクトフォーム</h3>';
        echo '<form class="contact-form" action="mail.php" method="post">';
          echo '<div class="form-group">';
            echo '<label for="InputEmail">お名前</label>';
            echo '<div class="display-form display-name">';
              echo $_SESSION['name'];
            echo '</div>';
            echo '<small id="emailHelp" class="form-text text-muted">ご記入いただいた個人情報は、お問い合わせへの回答、情報提供のために使用させていただきます。</small>';
          echo '</div>';
          echo '<div class="form-group">';
            echo '<label for="exampleInputPassword1">ご連絡するメールアドレス</label>';
            echo $_SESSION['email'];
          echo '</div>';
          echo '<div class="form-group">';
            echo '<label for="InputContent">お問い合わせ内容</label>';
            echo $_SESSION['content'];
            echo '<p>入力内容が正しければ送信してください</p><br>';
          echo '<button type="submit" name="action" value="send" class="contact-submit btn bg-pink text-white d-block mx-auto my-3">送信</button>';
          echo '<button type="button" onclick="history.go(-1)" class="contact-submit btn bg-pink text-white d-block mx-auto my-3">入力フォームに戻る</button>';
        echo '</form>';
    }elseif($action == "send"){
    $status = mb_send_mail($to, $subject, $message, $header);
    if ($status) {
    echo '<p class="msg">メッセージは正常に送信されました</p>';
    echo '<button type="button" onclick="history.go(-2)">入力フォームに戻る</button>';
    } else {
    echo '<p class="msg">メッセージの送信に失敗しました</p>';
    echo '<button type="button" onclick="history.go(-2)">入力フォームに戻る</button>';
    }
    $_SESSION = array();
    session_destroy();
    }
    ?>

  </body>
</html>
