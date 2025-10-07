<?php
// Добавляем заголовки для CORS и JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Логируем ошибки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Функция для отправки JSON ответа
function sendResponse($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Неправильный метод запроса');
}

// Проверяем согласие
if (!isset($_POST['agree'])) {
    sendResponse(false, 'Необходимо согласие на обработку персональных данных');
}

// Проверяем файл
if (!isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    sendResponse(false, 'Файл не был загружен или произошла ошибка загрузки');
}

$file = $_FILES['resume'];

// Проверяем размер файла
if ($file['size'] > 5 * 1024 * 1024) {
    sendResponse(false, 'Файл слишком большой. Максимальный размер - 5MB');
}

// Настройки email
$to = 'zipode5@mail.ru';
$subject = 'Резюме с сайта';
$message = "Пользователь отправил резюме через форму на сайте.\n\n";
$message .= "Имя файла: " . $file['name'] . "\n";
$message .= "Размер файла: " . $file['size'] . " байт\n";
$message .= "Тип файла: " . $file['type'] . "\n";

$from = 'noreply@' . $_SERVER['HTTP_HOST'];

// Заголовки
$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";

// Создаем boundary
$boundary = md5(time());

$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Тело письма
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= "$message\r\n";

// Добавляем файл
$body .= "--$boundary\r\n";
$body .= "Content-Type: application/octet-stream; name=\"" . basename($file['name']) . "\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"" . basename($file['name']) . "\"\r\n\r\n";

// Читаем и кодируем файл
$fileContent = file_get_contents($file['tmp_name']);
$body .= chunk_split(base64_encode($fileContent)) . "\r\n";
$body .= "--$boundary--";

// Пытаемся отправить письмо
try {
    $mailSent = mail($to, $subject, $body, $headers);
    
    if ($mailSent) {
        sendResponse(true, 'Резюме успешно отправлено! Мы свяжемся с Вами в ближайшее время.');
    } else {
        sendResponse(false, 'Ошибка при отправке письма. Функция mail() вернула false.');
    }
} catch (Exception $e) {
    sendResponse(false, 'Ошибка отправки: ' . $e->getMessage());
}
?>