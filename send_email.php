<?php
// Файл: send_resume.php

// Устанавливаем кодировку
header('Content-Type: application/json; charset=utf-8');

// Проверяем, что форма была отправлена
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса.']);
    exit;
}

// Проверяем наличие файла
if (!isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Ошибка загрузки файла.']);
    exit;
}

// Проверяем согласие на обработку данных
if (!isset($_POST['agreement']) || $_POST['agreement'] !== 'on') {
    echo json_encode(['success' => false, 'message' => 'Необходимо согласие на обработку персональных данных.']);
    exit;
}

// Получаем информацию о файле
$file = $_FILES['resume'];
$fileName = $file['name'];
$fileTmpName = $file['tmp_name'];
$fileSize = $file['size'];

// Проверяем размер файла (максимум 5MB)
if ($fileSize > 5 * 1024 * 1024) {
    echo json_encode(['success' => false, 'message' => 'Файл слишком большой. Максимальный размер - 5MB.']);
    exit;
}

// Настройки для отправки email
$to = 'zipode5@mail.ru'; // Email получателя
$subject = 'Новое резюме с сайта';
$from = 'noreply@' . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'example.com');

// Текст письма
$message = "
Поступило новое резюме с сайта.

Информация о файле:
- Имя файла: $fileName
- Размер: " . round($fileSize / 1024, 2) . " KB

Дата отправки: " . date('d.m.Y H:i:s') . "
IP отправителя: " . ($_SERVER['REMOTE_ADDR'] ?? 'неизвестен') . "
";

// Подготовка вложения
$fileContent = file_get_contents($fileTmpName);
if ($fileContent === false) {
    echo json_encode(['success' => false, 'message' => 'Ошибка чтения файла.']);
    exit;
}

$fileContent = chunk_split(base64_encode($fileContent));
$boundary = md5(time());

// Заголовки письма
$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Формируем тело письма с вложением
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=utf-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $message . "\r\n";

$body .= "--$boundary\r\n";
$body .= "Content-Type: application/octet-stream; name=\"$fileName\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
$body .= $fileContent . "\r\n";
$body .= "--$boundary--";

// Отправляем email
if (mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers)) {
    echo json_encode([
        'success' => true, 
        'message' => 'Ваше резюме успешно отправлено! Мы свяжемся с Вами в ближайшее время.'
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.']);
}
?>