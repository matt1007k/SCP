<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historiales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('anio', 10);
            $table->string('meses', 100);
            $table->string('dni', 10);
            $table->unsignedBigInteger('persona_id');
            $table->string('dni_user', 8);
            $table->string('certificado', 20)->nullable();
            $table->enum('tipo', ['rango', 'anio', 'mes']);
            $table->enum('estado', ['creado', 'eliminado'])->default('creado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historiales');
    }
}
