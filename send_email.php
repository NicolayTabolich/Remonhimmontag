<?php
// Настройки
$to_email = 'zipode5@mail.ru'; // Замените на ваш email
$from_email = 'noreply@' . $_SERVER['HTTP_HOST'];
$subject = 'Резюме с сайта';

// Проверяем, была ли отправлена форма
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Проверяем согласие на обработку данных
    if (!isset($_POST['agree'])) {
        showError('Необходимо согласие на обработку персональных данных');
    }
    
    // Проверяем, был ли загружен файл
    if (!isset($_FILES['resume']) || $_FILES['resume']['error'] != UPLOAD_ERR_OK) {
        showError('Ошибка загрузки файла. Пожалуйста, попробуйте еще раз.');
    }
    
    $file = $_FILES['resume'];
    
    // Проверяем тип файла
    $allowed_types = array(
        'application/pdf', 
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (!in_array($file['type'], $allowed_types)) {
        showError('Разрешены только файлы PDF и Word (.doc, .docx)');
    }
    
    // Проверяем размер файла (максимум 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        showError('Файл слишком большой. Максимальный размер - 5MB');
    }
    
    // Подготавливаем данные для письма
    $message = "Новое резюме отправлено через форму на сайте.\n\n";
    $message .= "Информация о файле:\n";
    $message .= "Имя: " . $file['name'] . "\n";
    $message .= "Тип: " . $file['type'] . "\n";
    $message .= "Размер: " . round($file['size'] / 1024, 2) . " KB\n";
    $message .= "Дата отправки: " . date('d.m.Y H:i:s') . "\n";
    
    // Заголовки письма
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $from_email\r\n";
    
    // Создаем границу для multipart письма
    $boundary = md5(time());
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    
    // Тело письма
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";
    
    // Добавляем файл
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: " . $file['type'] . "; name=\"" . $file['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n";
    
    // Читаем и кодируем файл
    $file_content = file_get_contents($file['tmp_name']);
    $body .= chunk_split(base64_encode($file_content)) . "\r\n";
    $body .= "--$boundary--";
    
    // Отправляем письмо
    if (mail($to_email, $subject, $body, $headers)) {
        showSuccess('Резюме успешно отправлено! Мы свяжемся с Вами в ближайшее время.');
    } else {
        showError('Ошибка при отправке письма. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.');
    }
    
} else {
    // Если кто-то пытается напрямую открыть этот файл
    header('Location: index.html');
    exit;
}

// Функция для показа сообщения об ошибке
function showError($message) {
    echo '<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ошибка отправки</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f5f7fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .message { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
            .error { border-left: 4px solid #e74c3c; }
            .success { border-left: 4px solid #2ecc71; }
            h2 { margin-top: 0; }
            a { display: inline-block; margin-top: 15px; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class="message error">
            <h2>Ошибка отправки</h2>
            <p>' . $message . '</p>
            <a href="index.html">Вернуться назад</a>
        </div>
    </body>
    </html>';
    exit;
}

// Функция для показа сообщения об успехе
function showSuccess($message) {
    echo '<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Успешная отправка</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f5f7fa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
            .message { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
            .error { border-left: 4px solid #e74c3c; }
            .success { border-left: 4px solid #2ecc71; }
            h2 { margin-top: 0; }
            a { display: inline-block; margin-top: 15px; padding: 10px 20px; background: #3498db; color: white; text-decoration: none; border-radius: 4px; }
        </style>
    </head>
    <body>
        <div class="message success">
            <h2>Успешно!</h2>
            <p>' . $message . '</p>
            <a href="index.html">Вернуться назад</a>
        </div>
    </body>
    </html>';
    exit;
}
?>