<?php
namespace App\Services;

use Carbon\Carbon;

class DateTimeService{

    public function __construct(){
    }

    public function convertStringToDate(string $dateString){
        if(empty($dateString) || 'INICIO' || 'FIN' || gettype($dateString) != 'string') return null;

        $dateFormat = str_replace('/', '-', $dateString);

        $date = Carbon::parse($dateFormat);

        return $date; 
    }

    public function convertIntToDate($dateInt){
        if(empty($dateInt) || gettype($dateInt) != 'int') return null;
        $date = Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($dateInt));
        return $date;
    }
}
