<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PersonaCreatedRequest;
use App\Models\Persona;
use Auth;
use Illuminate\Http\Request;

class PersonaController extends Controller
{

    public function __construct()
    {
        $this->middleware('can:personas.index')->only(['index']);
        $this->middleware('can:personas.show')->only(['show']);
        $this->middleware('can:personas.create')->only(['create', 'store']);
        $this->middleware('can:personas.edit')->only(['edit', 'update']);
        $this->middleware('can:personas.destroy')->only(['destroy']);
    }

    public function search(Request $request)
    {
        $concat = "apellido_paterno,' ',apellido_materno,', ', nombre";
        $personas = Persona::where('estado', request('estado'))
            ->where(function ($query) use ($concat) {
                $query->where('codigo_modular', 'LIKE', '%' . request('q') . '%')
                    ->orWhere('dni', 'LIKE', '%' . request('q') . '%')
                    ->orWhereRaw("CONCAT($concat) LIKE '%" . request('q') . "%'");
            })->orderBy('apellido_paterno', 'DESC')->get();

        return response()->json(['personas' => $personas], 200);
    }

    public function index(Request $request)
    {
        $estado = $request->get('estado') ?? $request->get('estado');

        $personas = Persona::where('estado', $estado)->get();

        return response()->json(['personas' => $personas], 200);
    }

    public function store(PersonaCreatedRequest $request)
    {
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

    public function update(PersonaCreatedRequest $request, $id)
    {
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
