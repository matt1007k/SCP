<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\HaberDescuentoImport;
use App\Imports\PersonasImport;
use App\Models\Detalle;
use App\Models\HaberDescuento;
use App\Models\Pago;
use App\Models\Persona;
use App\Models\User;
use App\Notifications\DataImported;
use App\Services\DateTimeService;
use App\Services\HaberesImponiblesService;
use App\Services\MesesService;
use App\Services\PagosService;
use App\Services\PersonasService;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Maatwebsite\Excel\Facades\Excel;

class ImportarController extends Controller
{
    protected $personaService;
    protected $pagoService;
    public function __construct()
    {
        $this->middleware('can:importar.personas')->only(['personas']);
        $this->middleware('can:importar.descuentos')->only(['descuentos']);
        $this->personaService = new PersonasService;
        $this->pagoService = new PagosService;
    }

    public function updateDataPersonas(Request $request){
        $request->validate([
            'archivo' => 'required|mimes:xls,xlsx',
        ]);
        set_time_limit(0);
        // ini_set('memory_limit', '20.97152M');
        ini_set('memory_limit', '-1');
        $archivo = $request->file('archivo')->getClientOriginalName();
        $filename = pathinfo($archivo, PATHINFO_FILENAME);

        $estadoExcelNombre = substr($filename, -1);    

        $estado = $this->personaService->getEstado($estadoExcelNombre);
        if ($estado === '') {
            return response()->json([
                'msg' => 'El nombre del archivo excel no es correcto',
                'import' => false,
            ], 200);
        }
        try {
            $personasExcel = Excel::toCollection(new PersonasImport(), $request->file('archivo'));
        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            if ($e) {
                return response()->json([
                    'import' => true,
                    'msg' => 'El archivo excel no tiene datos.',
                ], 200);
            }
        }
        if($personasExcel[0]){
            // return $personasExcel[0];
            foreach($personasExcel[0] as $personaExcel){
                $this->personaService->validateRowExcel($personaExcel);

                $mesesService = new MesesService();
                
                $totalPersonas = count($personasExcel[0]);

                $personal = User::all()->filter(function ($user) {
                    return $user->roles('Personal');
                });

                [$anio, $mes_numero] = $this->personaService->getFileNameElements($filename);
                $nombre_mes = $mesesService->getNameMonth($mes_numero);

                $personaExiste = Persona::where('nombre', $personaExcel[$this->personaService::FIELDS_EXCEL['nombre']])
                        ->where('apellido_paterno', $personaExcel[$this->personaService::FIELDS_EXCEL['apellido_paterno']])
                        ->where('apellido_materno', $personaExcel[$this->personaService::FIELDS_EXCEL['apellido_materno']])
                        ->where('estado', $estado)->first();

                if (!$personaExiste) {
                    $this->personaService->createPersona($personaExcel);
            
                } else {
                    // return trim($personaExcel['fdevengue']) ? 'no vacio' : 'vacio'; 
                     $this->personaService->updatePersona($personaExiste, $personaExcel);
                }

            }
            
            // Total de personas subidos (121), de Julio del 2019
            $message = "Total de personas subidos ($totalPersonas), de $nombre_mes del $anio";

            Notification::send($personal, new DataImported($message));

            return response()->json([
                'import' => true
            ]);

        }else{
            return response()->json([
                'import' => false,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200); 
        }
    }

    public function personas(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xls,xlsx',
        ]);
        set_time_limit(0);
        // ini_set('memory_limit', '20.97152M');
        ini_set('memory_limit', '-1');

        $archivo = $request->file('archivo')->getClientOriginalName();
        $filename = pathinfo($archivo, PATHINFO_FILENAME);

        $estadoExcelNombre = substr($filename, -1);
        $estado = $this->personaService->getEstado($estadoExcelNombre);
        if ($estado === '') {
            return response()->json([
                'msg' => 'El nombre del archivo excel no es correcto',
                'import' => false,
            ], 200);
        }
        try {
            $personasExcel = Excel::toCollection(new PersonasImport(), $request->file('archivo'));
        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            if ($e) {
                return response()->json([
                    'import' => true,
                    'msg' => 'El archivo excel no tiene datos.',
                ], 200);
            }
        }
        // return $personasExcel[0];
        if (count($personasExcel[0])) {
            foreach ($personasExcel[0] as $personaExcel) {
                $this->personaService->validateRowExcel($personaExcel);

                $personaExiste = Persona::where('nombre', $personaExcel[$this->personaService::FIELDS_EXCEL['nombre']])
                    ->where('apellido_paterno', $personaExcel[$this->personaService::FIELDS_EXCEL['apellido_paterno']])
                    ->where('apellido_materno', $personaExcel[$this->personaService::FIELDS_EXCEL['apellido_materno']])
                    ->where('estado', $estado)->first();

                if (!$personaExiste) {
                    $persona = $this->personaService->createPersona($personaExcel);
                    if ($persona) {
                      $this->pagoService->createPago($personaExcel, $persona);
                    }
                } else {
                    $this->pagoService->createPago($personaExcel, $personaExiste);
                }

            }
            $mesesService = new MesesService();

            $personal = User::all()->filter(function ($user) {
                return $user->roles('Personal');
            });

            $totalPagos = count($personasExcel[0]);
            $anio = substr($filename, 0, 4);
            $mes_estado = substr($filename, -3);
            $mes_numero = substr($mes_estado, 0, 2);
            $nombre_mes = $mesesService->getNameMonth($mes_numero);

            // Total de pagos subidos (121), de Julio del 2019
            $message = "Total de pagos subidos ($totalPagos), de $nombre_mes del $anio";

            Notification::send($personal, new DataImported($message));

            // $redis = Redis::connection();
            // $redis->publish('message', json_encode([
            //     'message' => $message,
            //     'admin' => auth()->user(),
            // ]));

            return response()->json([
                'import' => true,
            ]);
        } else {
            return response()->json([
                'import' => false,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200);
        }
    }

    public function descuentos(Request $request)
    {
        $request->validate([
            'archivo' => 'required|mimes:xls,xlsx',
        ]);
        set_time_limit(0);
        $haberImpService = new HaberesImponiblesService();

        // $import->onlySheets('haberes', 'descuentos');
        // $headings = (new HeadingRowImport)->toArray($request->file('archivo'));

        // dd(Auth::user()->id);

        try {
            $import = new HaberDescuentoImport();
            $hdescuentosExcel = Excel::toCollection($import, $request->file('archivo'));
        } catch (\PhpOffice\PhpSpreadsheet\Exception $e) {
            if ($e) {
                return response()->json([
                    'import' => true,
                    'msg' => 'El archivo excel no tiene datos.',
                ], 200);
            }
        }

        if (count($hdescuentosExcel) > 0) {

            foreach ($hdescuentosExcel['HABERES'] as $haber) {

                $codigo = 'H' . $haber['codigo'];
                $haberEncontrado = HaberDescuento::where('codigo', $codigo)->first();
                if (!$haberEncontrado) {
                    $hdescuento = new HaberDescuento();
                    $hdescuento->codigo = $codigo;
                    $hdescuento->tipo = "haber";
                    $hdescuento->nombre = $haber['concepto'];
                    $hdescuento->descripcion = $haber['det1'];
                    $hdescuento->descripcion_simple = $haber['det2'];
                    $hdescuento->user_id = Auth::user()->id;
                    foreach ($haberImpService->getHaberesImpobibles() as $haberImponible) {
                        if ($haber['det1'] == $haberImponible['descripcion']) {
                            $hdescuento->es_imponible = true;
                        }
                    }
                    $hdescuento->save();
                }

            }

            foreach ($hdescuentosExcel['DESCUENTOS'] as $descuento) {

                $codigo = 'D' . $descuento['codigo'];
                $descuentoEncontrado = HaberDescuento::where('codigo', $codigo)->first();
                if (!$descuentoEncontrado) {
                    $hdescuento = new HaberDescuento();
                    $hdescuento->codigo = $codigo;
                    $hdescuento->tipo = "descuento";
                    $hdescuento->nombre = $descuento['concepto'];
                    $hdescuento->descripcion = $descuento['det1'];
                    $hdescuento->descripcion_simple = $descuento['det2'];
                    $hdescuento->user_id = Auth::user()->id;
                    $hdescuento->save();
                }

            }

            // Total de haberes subidos (121)
            // Total de descuentos subidos (121)
            $totalHaberes = count($hdescuentosExcel['HABERES']);
            $totalDescuentos = count($hdescuentosExcel['DESCUENTOS']);

            $personal = User::all()->filter(function ($user) {
                return $user->roles('Personal');
            });
            $message1 = "Total de haberes subidos ($totalHaberes)";
            $message2 = "Total de descuentos subidos ($totalDescuentos)";

            Notification::send($personal, new DataImported($message1));
            Notification::send($personal, new DataImported($message2));
            // $redis = Redis::connection();

            // $redis->publish('message', json_encode([
            //     'message' => $message1,
            //     'admin' => auth()->user(),
            // ]));
            // $redis->publish('message', json_encode([
            //     'message' => $message2,
            //     'admin' => auth()->user(),
            // ]));

            return response()->json([
                'import' => true,
            ]);
        } else {
            return response()->json([
                'import' => true,
                'msg' => 'El archivo excel no tiene datos.',
            ], 200);
        }

    }

}
