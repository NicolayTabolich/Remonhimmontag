<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из формы
    $userAgreement = isset($_POST['agree']) ? true : false;
    
    // Проверяем согласие на обработку данных
    if (!$userAgreement) {
        echo json_encode(['success' => false, 'message' => 'Необходимо согласие на обработку персональных данных']);
        exit;
    }
    
    // Проверяем, что файл был загружен
    if (!isset($_FILES['resume']) || $_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(['success' => false, 'message' => 'Файл не был загружен']);
        exit;
    }
    
    $file = $_FILES['resume'];
    
    // Проверяем тип файла
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['success' => false, 'message' => 'Разрешены только файлы PDF и Word']);
        exit;
    }
    
    // Проверяем размер файла (не более 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'Файл слишком большой. Максимальный размер - 5MB']);
        exit;
    }
    
    // Настройки для отправки email
    $to = 'zipode5@mail.ru';
    $subject = 'Резюме с сайта';
    $message = 'Пользователь отправил резюме через форму на сайте.';
    $headers = [
        'From: no-reply@yoursite.com',
        'Reply-To: no-reply@yoursite.com',
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="boundary"'
    ];
    
    // Создаем boundary
    $boundary = uniqid();
    
    // Тело письма
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= "$message\r\n";
    
    // Добавляем файл
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"" . $file['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n";
    $body .= chunk_split(base64_encode(file_get_contents($file['tmp_name']))) . "\r\n";
    $body .= "--$boundary--";
    
    // Отправляем письмо
    $mailSent = mail($to, $subject, $body, implode("\r\n", $headers));
    
    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Резюме успешно отправлено']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при отправке письма']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неправильный метод запроса']);
}
?>