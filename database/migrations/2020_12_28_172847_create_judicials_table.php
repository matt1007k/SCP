<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJudicialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judicials', function (Blueprint $table) {
            $table->id();
            $table->string('periodo', 6);
            $table->string('b_nombre', 100);
            $table->string('b_apellido_paterno', 100);
            $table->string('b_apellido_materno', 100);
            $table->string('b_dni', 9);
            $table->string('sexo', 20);
            $table->date('fecha_nacimiento');
            $table->integer('total');

            $table->foreignId('persona_id')->constrained('personas')->cascadeOnDelete();
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
        Schema::dropIfExists('judicials');
    }
}
