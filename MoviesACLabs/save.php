<?php
  $mname = $_POST['movie_name'];
  $file = "Data/movies.txt";

  $f = fopen ($file, 'a+');
  fwrite($f, $mname);
  fclose($f);
?>
