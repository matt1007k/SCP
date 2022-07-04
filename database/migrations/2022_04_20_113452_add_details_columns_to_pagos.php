<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDetailsColumnsToPagos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('pagos', function (Blueprint $table) {
            $table->date('fecha_nacimiento')->nullable();
            $table->string('establecimiento', 100)->nullable();
            $table->string('tipo_servidor', 100)->nullable();
            $table->string('regimen_laboral', 100)->nullable();
            $table->string('nivel_magisterial', 50)->nullable();
            $table->string('grupo_ocupacion', 50)->nullable();
            $table->string('horas', 10)->nullable();
            $table->string('tiempo_servicio', 20)->nullable();
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
            $table->string('numero_cuenta', 20)->nullable();
            $table->string('leyenda_permanente', 100)->nullable();
            $table->string('leyenda_mensual', 100)->nullable();
            $table->string('codigo_fiscal', 50)->nullable();
            $table->string('codigo_essalud', 30)->nullable();
            $table->string('codigo_afp', 30)->nullable();
            $table->string('afp_boleta', 30)->nullable();
            $table->date('fafiliacion')->nullable();
            $table->date('fdevengue')->nullable();
            $table->string('codigo_establecimiento', 30)->nullable();
            $table->string('numero_cargo', 30)->nullable();
            $table->string('situacion', 30)->nullable();
            $table->string('tipo_pension', 150)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('pagos', function (Blueprint $table) {
            $table->dropColumn([
                'fecha_nacimiento',
                'establecimiento',
                'tipo_servidor',
                'regimen_laboral',
                'nivel_magisterial',
                'grupo_ocupacion',
                'horas',
                'tiempo_servicio',
                'fecha_inicio',
                'fecha_fin',
                'numero_cuenta',
                'leyenda_permanente',
                'leyenda_mensual',
                'codigo_fiscal',
                'codigo_essalud',
                'afp_boleta',
                'codigo_afp',
                'fafiliacion',
                'fdevengue',
                'codigo_establecimiento',
                'numero_cargo',
                'situacion',
                'tipo_pension'
            ]);
        });
    }
}
