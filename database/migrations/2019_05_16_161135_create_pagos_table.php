<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('anio', 4);
            $table->string('mes', 2);
            $table->decimal('total_descuento', 7, 2);
            $table->decimal('total_haber', 7, 2);
            $table->decimal('monto_liquido', 7, 2);
            $table->decimal('monto_imponible', 7, 2);

            $table->unsignedBigInteger('persona_id');
            $table->foreign('persona_id')->references('id')
                ->on('personas')
                ->onDelete('cascade');             

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
        Schema::dropIfExists('pagos');
    }
}
