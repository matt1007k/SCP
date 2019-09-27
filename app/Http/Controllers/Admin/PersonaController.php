<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Persona;
use Auth;
use Illuminate\Http\Request;

class PersonaController extends Controller
{

    public function __construct()
    {
        $this->middleware('has.permission:personas.index')->only(['index']);
        $this->middleware('has.permission:personas.show')->only(['show']);
        $this->middleware('has.permission:personas.create')->only(['create', 'store']);
        $this->middleware('has.permission:personas.edit')->only(['edit', 'update']);
        $this->middleware('has.permission:personas.destroy')->only(['destroy']);
    }

    public function search(Request $request)
    {
        $personas = Persona::where('estado', request('estado'))
            ->where(function ($query) use ($request) {
                $query->where('codigo_modular', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('dni', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('nombre', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('apellido_paterno', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('apellido_materno', 'LIKE', '%' . request('q') . '%');
            })->orderBy('apellido_paterno', 'DESC')->get();

        return response()->json(['personas' => $personas], 200);
    }

    public function index(Request $request)
    {
        $estado = $request->get('estado') ?? $request->get('estado');

        $personas = Persona::where('estado', $estado)->get();

        return response()->json(['personas' => $personas], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'dni' => 'required|min:8',
            'cargo' => 'required',
            'codigo_modular' => 'required|min:10',
            'estado' => 'required',
        ]);
        // return $request;

        $persona = new Persona();
        $persona->nombre = $request->nombre;
        $persona->apellido_paterno = $request->apellido_paterno;
        $persona->apellido_materno = $request->apellido_materno;
        $persona->dni = $request->dni;
        $persona->codigo_modular = $request->codigo_modular;
        $persona->cargo = $request->cargo;
        $persona->estado = $request->estado;
        $persona->user_id = Auth::id();

        if ($persona->save()) {
            return response()->json([
                'persona' => $persona,
            ]);
        }

    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'dni' => 'required|min:8',
            'cargo' => 'required',
            'codigo_modular' => 'required|min:10',
            'estado' => 'required',
        ]);

        // return $request;

        $persona = Persona::findOrFail($id);
        $persona->nombre = $request->nombre;
        $persona->apellido_paterno = $request->apellido_paterno;
        $persona->apellido_materno = $request->apellido_materno;
        $persona->dni = $request->dni;
        $persona->codigo_modular = $request->codigo_modular;
        $persona->cargo = $request->cargo;
        $persona->estado = $request->estado;
        $persona->user_id = Auth::id();

        if ($persona->save()) {
            return response()->json([
                'persona' => $persona,
            ]);
        }

    }

    public function destroy($id)
    {
        $persona = Persona::find($id);

        if ($persona->delete()) {
            return response()->json([
                'persona' => $persona,
            ]);
        }

    }

}
