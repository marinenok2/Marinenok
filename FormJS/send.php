<?php

// Отримуємо дані з POST-запиту
$message = $_POST['message'];

// ID вашого бота Telegram
$botToken = '6460065158:AAF2W8jx-0kCQyNvnBwpdqRYgiUlPXqnDBY';

// ID чату, куди ви хочете надіслати повідомлення
$chatId = '743212645';

// URL API Telegram
$url = "https://api.telegram.org/bot$botToken/sendMessage";

// Дані, які будемо відправляти на сервер Telegram
$data = array(
    'chat_id' => $chatId,
    'text' => $message
);

$options = array(
    'http' => array(
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => json_encode($data)
    )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

// Перевірка результату
if ($result === FALSE) {
    // Якщо сталася помилка
    echo 'Error sending message to Telegram';
} else {
    // Якщо все пройшло успішно
    echo 'Message sent to Telegram';
}

?>
