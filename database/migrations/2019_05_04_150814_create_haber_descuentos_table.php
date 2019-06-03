<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHaberDescuentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('haber_descuentos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('codigo', 6)->unique();
            $table->string('tipo', 50);
            $table->string('nombre', 200);
            $table->text('descripcion', 100);
            $table->text('descripcion_simple', 100);
            $table->boolean('es_imponible')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')
                ->on('users')
                ->onDelete('cascade');
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
        Schema::dropIfExists('haber_descuentos');
    }
}
