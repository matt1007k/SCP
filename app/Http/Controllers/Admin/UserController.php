<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserCreatedRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:users.index')->only(['index']);
        $this->middleware('can:users.create')->only(['store']);
        $this->middleware('can:users.edit')->only(['update']);
        $this->middleware('can:users.destroy')->only(['destroy']);
    }

    public function index()
    {
        $usuarios = User::With(['roles', 'permissions'])->get();

        return response()->json(['usuarios' => $usuarios], 200);
    }

    public function store(UserCreatedRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->dni = $request->dni;
        $user->email = $request->email;
        $user->estado = $request->estado;
        $user->password = Hash::make($request->password);

        if ($user->save()) {
            if ($request->has('roles')) {
                $user->roles()->sync(collect($request->roles)->pluck('id')->toArray());
            }
            if ($request->has('permissions')) {
                $user->permissions()->sync(collect($request->permissions)->pluck('id')->toArray());
            }
            return response()->json([
                'updated' => true,
            ], 200);
        } else {
            return response()->json([
                'updated' => false,
            ], 200);
        }
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'dni' => ['required', 'numeric', 'min:8', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'estado' => ['required'],
        ]);
        $user->name = $request->name;
        $user->dni = $request->dni;
        $user->estado = $request->estado;
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($user->save()) {
            if ($request->has('roles')) {
                $user->roles()->sync(collect($request->roles)->pluck('id')->toArray());
            }
            if ($request->has('permissions')) {
                $user->permissions()->sync(collect($request->permissions)->pluck('id')->toArray());
            }
            return response()->json([
                'updated' => true,
            ], 200);
        } else {
            return response()->json([
                'updated' => false,
            ], 200);
        }
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->estado === 'activo') {
            $user->estado = 'inactivo';
        } else if ($user->estado === 'inactivo') {
            $user->estado = 'activo';
        }

        if ($user->save()) {
            return response()->json([
                'deleted' => true,
            ]);
        }

    }

    public function editarAuth(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'dni' => ['required', 'numeric', 'min:8', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);
        $user->name = $request->name;
        $user->dni = $request->dni;
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($user->save()) {
            return response()->json([
                'updated' => true,
            ], 201);
        } else {
            return response()->json([
                'updated' => false,
            ], 201);
        }
    }
}
