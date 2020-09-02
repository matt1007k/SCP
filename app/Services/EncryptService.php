<?php

namespace App\Services;

class EncryptService
{
    protected $url;

    public function __construct(String $url)
    {
        $this->url = $url;
    }

    public function getEncrypt()
    {
        return base64_encode($this->url);
    }

    public function getDecodeEncrypt()
    {
        return base64_decode($this->url);
    }
}
