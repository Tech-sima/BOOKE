<?php
/**
 * Простой endpoint для создания Telegram Stars invoice
 * Разместите этот файл на вашем хостинге
 * 
 * Использование: POST запрос с параметрами caseIndex, caseName, starsPrice, userId
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Токен бота
$BOT_TOKEN = '8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU';

// Получаем данные из POST запроса
$input = json_decode(file_get_contents('php://input'), true);

$caseIndex = $input['caseIndex'] ?? 0;
$caseName = $input['caseName'] ?? 'Кейс';
$starsPrice = $input['starsPrice'] ?? 1;
$userId = $input['userId'] ?? null;

if (!$userId) {
    echo json_encode([
        'ok' => false,
        'error' => 'User ID не указан'
    ]);
    exit;
}

// Создаем payload для invoice
$payload = json_encode([
    'type' => 'case_purchase',
    'caseIndex' => $caseIndex,
    'caseName' => $caseName,
    'starsPrice' => $starsPrice,
    'timestamp' => time()
]);

// Данные для создания invoice link
// createInvoiceLink не требует chat_id, так как создает ссылку, а не отправляет сообщение
$invoiceData = [
    'title' => "Покупка {$caseName}",
    'description' => "{$caseName} за {$starsPrice} звезд Telegram",
    'payload' => $payload,
    'provider_token' => '', // Для Telegram Stars оставляем пустым
    'currency' => 'XTR',    // XTR - валюта Telegram Stars
    'prices' => json_encode([[
        'label' => $caseName,
        'amount' => $starsPrice
    ]])
];

// Отправляем запрос к Telegram Bot API для создания invoice link (не sendInvoice!)
// createInvoiceLink создает ссылку, которую можно открыть в Mini App
$url = "https://api.telegram.org/bot{$BOT_TOKEN}/createInvoiceLink";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($invoiceData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Возвращаем результат
echo $response;
?>

