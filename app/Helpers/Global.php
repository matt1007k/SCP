<?php

function setInitializeName($objectName)
{
    $array = explode(' ', $objectName);
    $initialeName = '';
    foreach ($array as $w) {
        $initialeName .= $w[0] . '.';
    }
    return $initialeName;
}
