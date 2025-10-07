<?php
// Простой скрипт для отправки email
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Получаем данные
    $file = $_FILES['resume'];
    $agree = isset($_POST['agree']) ? true : false;
    
    if (!$agree) {
        echo "ERROR: Необходимо согласие на обработку данных";
        exit;
    }
    
    // Проверяем файл
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo "ERROR: Ошибка загрузки файла";
        exit;
    }
    
    // Настройки email
    $to = 'zipode5@mail.ru';
    $subject = 'Резюме с сайта';
    $message = "Новое резюме отправлено через форму на сайте.\n\n";
    $message .= "Детали файла:\n";
    $message .= "- Имя: " . $file['name'] . "\n";
    $message .= "- Размер: " . round($file['size'] / 1024, 2) . " KB\n";
    $message .= "- Тип: " . $file['type'] . "\n";
    
    $headers = "From: noreply@site.com\r\n";
    $headers .= "Reply-To: noreply@site.com\r\n";
    
    // Граница для multipart
    $boundary = md5(time());
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    
    // Тело письма
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=utf-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";
    
    // Добавляем файл
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"" . $file['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n";
    
    $fileContent = file_get_contents($file['tmp_name']);
    $body .= chunk_split(base64_encode($fileContent));
    $body .= "--$boundary--";
    
    // Отправляем
    if (mail($to, $subject, $body, $headers)) {
        echo "SUCCESS: Резюме успешно отправлено!";
    } else {
        echo "ERROR: Не удалось отправить письмо";
    }
    
} else {
    echo "ERROR: Разрешены только POST запросы";
}
?>