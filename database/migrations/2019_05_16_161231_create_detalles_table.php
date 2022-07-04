<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetallesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->decimal('monto', 7, 2);
            $table->unsignedBigInteger('pago_id');
            $table->foreign('pago_id')->references('id')
                ->on('pagos')
                ->onDelete('cascade');
            $table->unsignedBigInteger('hd_id');
            $table->foreign('hd_id')->references('id')
                ->on('haber_descuentos')
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
        Schema::dropIfExists('detalles');
    }
}