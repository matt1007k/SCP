<?php

namespace App\Services;

class JsonParseService
{
    protected $string;

    public function __construct(String $string)
    {
        $this->string = $string;
    }

    public function getJsonDecode()
    {
        return json_decode($this->string, false);
    }

    public function getJsonEncode()
    {
        return json_encode($this->string);
    }
}
