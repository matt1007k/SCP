<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermisoCreatedRequest;
use App\Http\Requests\PermisoUpdatedRequest;
use Caffeinated\Shinobi\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:permissions.index')->only(['index']);
        // $this->middleware('can:permissions.show')->only(['show']);
        $this->middleware('can:permissions.create')->only(['create', 'store']);
        $this->middleware('can:permissions.edit')->only(['edit', 'update']);
        $this->middleware('can:permissions.destroy')->only(['destroy']);
    }
    public function index(Request $request)
    {
        $search = request('search', '');
        $permissions = Permission::
            where('name', 'LIKE', "%{$search}%")
            ->orWhere('description', 'LIKE', "%{$search}%")
            ->orWhere('slug', 'LIKE', "%{$search}%")
            ->latest()
            ->paginate(request('perPage', 10));

        return response()->json($permissions, 200);
    }

    public function getPermissions(Request $request)
    {
        $permissions = Permission::orderBy('name', 'ASC')->get();

        return response()->json(['permissions' => $permissions], 200);
    }

    public function store(PermisoCreatedRequest $request)
    {
        $permission = new Permission();
        $permission->name = $request->nombre;
        $permission->slug = $request->identificador;
        $permission->description = $request->descripcion;
        if ($permission->save()) {
            return response()->json([
                'created' => true,
            ], 200);
        } else {
            return response()->json([
                'created' => false,
            ], 500);
        }
    }

    public function update(PermisoUpdatedRequest $request, $id)
    {
        $permission = Permission::findOrFail($id);
        $permission->name = $request->nombre;
        $permission->slug = $request->identificador;
        $permission->description = $request->descripcion;
        if ($permission->save()) {

            return response()->json([
                'updated' => true,
            ], 200);
        } else {
            return response()->json([
                'updated' => false,
            ], 500);
        }
    }
    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        if ($permission->delete()) {
            return response()->json([
                'deleted' => true,
            ], 200);
        }
    }
}
