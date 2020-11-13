<?php
namespace App\Services;

use Carbon\Carbon;

class DateTimeService{

    public function __construct(){
    }

    public function convertStringToDate(string $dateString){
        if(empty($dateString)){
            return null;
        }

        $dateFormat = str_replace('/', '-', $dateString);

        $date = Carbon::parse($dateFormat);

        return $date; 
    }

    public function convertIntToDate(int $dateInt){
        $date = Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($dateInt));
        return $date;
    }
}
