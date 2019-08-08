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
        $this->middleware('permission:personas.index')->only(['index']);
        $this->middleware('permission:personas.show')->only(['show']);
        $this->middleware('permission:personas.create')->only(['create', 'store']);
        $this->middleware('permission:personas.edit')->only(['edit', 'update']);
        $this->middleware('permission:personas.destroy')->only(['destroy']);
    }

    public function search(Request $request)
    {
        $personas = Persona::orderBy('apellido_paterno', 'DESC')
            ->when(request('q'), function ($query, $request) {
                $query->where('codigo_modular', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('dni', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('nombre', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('apellido_paterno', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('apellido_materno', 'LIKE', '%' . request('q') . '%');
            })
            ->get();

        return response()->json(['personas' => $personas], 200);
    }

    public function index(Request $request)
    {
        $tipo = $request->get('tipo') ?? $request->get('tipo');
        $personas = Persona::all();
        if ($tipo !== 'Todos') {
            $personas = Persona::where('estado', $tipo)->get();

        }

        return response()->json(['personas' => $personas], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'apellido_paterno' => 'required',
            'apellido_materno' => 'required',
            'dni' => 'required|min:8|unique:personas,dni',
            'cargo' => 'required',
            'codigo_modular' => 'required|min:10|unique:personas,codigo_modular',
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
        $persona = Persona::findOrFail($id);

        if ($persona->delete()) {
            return response()->json([
                'persona' => $persona,
            ]);
        }
    }

}
