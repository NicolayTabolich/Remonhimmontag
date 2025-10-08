<?php
// Включаем вывод ошибок для отладки (можно убрать в продакшене)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Логирование для отладки
function log_debug($message) {
    file_put_contents('debug.log', date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

// Начинаем логирование
log_debug("=== НОВЫЙ ЗАПРОС ===");

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    log_debug("Ошибка: не POST запрос");
    echo "Ошибка: неверный метод запроса";
    exit;
}

// Проверяем наличие файла
if (!isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
    log_debug("Ошибка загрузки файла: " . $_FILES['resume']['error']);
    echo "Ошибка загрузки файла. Код ошибки: " . $_FILES['resume']['error'];
    exit;
}

// Проверяем согласие на обработку данных
if (!isset($_POST['agreement']) || $_POST['agreement'] !== 'on') {
    log_debug("Ошибка: нет согласия на обработку данных");
    echo "Необходимо согласие на обработку персональных данных.";
    exit;
}

// Получаем информацию о файле
$file = $_FILES['resume'];
$fileName = $file['name'];
$fileTmpName = $file['tmp_name'];
$fileSize = $file['size'];
$fileType = $file['type'];

log_debug("Файл: $fileName, Размер: $fileSize, Тип: $fileType");

// Проверяем размер файла (максимум 5MB)
if ($fileSize > 5 * 1024 * 1024) {
    log_debug("Ошибка: файл слишком большой - $fileSize байт");
    echo "Файл слишком большой. Максимальный размер - 5MB.";
    exit;
}

// Проверяем тип файла
$allowedTypes = [
    'application/pdf' => 'pdf',
    'application/msword' => 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    'text/plain' => 'txt',
    'application/rtf' => 'rtf',
    'text/rtf' => 'rtf'
];

// Если тип не определен, пытаемся определить по расширению
if (empty($fileType)) {
    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    if (in_array($ext, ['pdf', 'doc', 'docx', 'txt', 'rtf'])) {
        log_debug("Тип файла определен по расширению: $ext");
    } else {
        log_debug("Ошибка: недопустимый тип файла по расширению: $ext");
        echo "Недопустимый тип файла. Разрешены: PDF, DOC, DOCX, TXT, RTF.";
        exit;
    }
} elseif (!array_key_exists($fileType, $allowedTypes)) {
    log_debug("Ошибка: недопустимый тип файла: $fileType");
    echo "Недопустимый тип файла. Разрешены: PDF, DOC, DOCX, TXT, RTF.";
    exit;
}

// Настройки для отправки email
$to = 'zipode5@mail.ru';
$subject = 'Новое резюме с сайта - ' . $fileName;
$from = 'noreply@' . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'example.com');

// Текст письма
$message = "
Поступило новое резюме с сайта.

Информация о файле:
- Имя файла: $fileName
- Размер: " . round($fileSize / 1024, 2) . " KB
- Тип: " . ($fileType ?: 'не определен')

Дата отправки: " . date('d.m.Y H:i:s') . "
IP отправителя: " . ($_SERVER['REMOTE_ADDR'] ?? 'неизвестен') . "
User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'неизвестен') . "
";

// Генерируем уникальную границу
$boundary = md5(time());

// Заголовки письма
$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Читаем содержимое файла
$fileContent = file_get_contents($fileTmpName);
if ($fileContent === false) {
    log_debug("Ошибка: не удалось прочитать файл");
    echo "Ошибка чтения файла.";
    exit;
}

// Кодируем файл в base64
$fileContentEncoded = chunk_split(base64_encode($fileContent));

// Формируем тело письма
$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=utf-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $message . "\r\n";

$body .= "--$boundary\r\n";
$body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
$body .= $fileContentEncoded . "\r\n";
$body .= "--$boundary--";

// Кодируем тему письма для поддержки кириллицы
$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

// Отправляем email
log_debug("Попытка отправки письма на: $to");
$mailResult = mail($to, $subjectEncoded, $body, $headers);

if ($mailResult) {
    log_debug("Письмо успешно отправлено");
    echo "Ваше резюме успешно отправлено! Мы свяжемся с Вами в ближайшее время.";
} else {
    log_debug("Ошибка отправки письма");
    
    // Дополнительная диагностика
    $lastError = error_get_last();
    $errorInfo = $lastError ? $lastError['message'] : 'Неизвестная ошибка';
    log_debug("Информация об ошибке: $errorInfo");
    
    echo "Произошла ошибка при отправке резюме. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.";
    
    // Для отладки можно вывести дополнительную информацию
    if (isset($_GET['debug'])) {
        echo "<br><small>Детали ошибки: $errorInfo</small>";
    }
}
?>