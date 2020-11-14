<?php
namespace App\Services;

class ImportElementsService{

    public function getTipoServicios(){
        return [
            [
                'id' => 0,
                'title' => 'Sin información',
            ],
            [
                'id' => 1,
                'title' => 'Docente Nombrado',
            ],
            [
                'id' => 2,
                'title' => 'Docente Contratado',
            ],
            [
                'id' => 3,
                'title' => 'Administrativo Nombrado',
            ],
            [
                'id' => 4,
                'title' => 'Administrativo Contratado',
            ],
            [
                'id' => 5,
                'title' => 'Administrativo de Serv. Nomb.',
            ],
            [
                'id' => 6,
                'title' => 'Administrativo de Serv. Contrat.',
            ],
            [
                'id' => 7,
                'title' => 'Auxiliar Educación Contratado',
            ],
            [
                'id' => 8,
                'title' => 'Auxiliar Educación Nombrado',
            ],
            [
                'id' => 9,
                'title' => 'Prof. Salud Nombrado',
            ],
            [
                'id' => 11,
                'title' => 'Prof. Salud Contratado',
            ],
            [
                'id' => 12,
                'title' => 'Palmas Magisteriales',
            ],
            [
                'id' => 15,
                'title' => 'Designacion/Confianza',
            ],
        ];
    }

    public function getRegimenLaborales(){
        return [
            [
                'id' => 0,
                'title' => 'Sin información',
            ],
            [
                'id' => 1,
                'title' => 'Ley Nro 24029',
            ],
            [
                'id' => 2,
                'title' => 'Ley Nro 29062',
            ],
            [
                'id' => 3,
                'title' => 'D.Ley Nro 276',
            ],
            [
                'id' => 4,
                'title' => 'D.Ley Nro 728',
            ],
            [
                'id' => 5,
                'title' => 'D.Ley Nro 559',
            ],
            [
                'id' => 6,
                'title' => 'Ley Nro 23536',
            ],
            [
                'id' => 7,
                'title' => 'Ley Nro 23536',
            ],
            [
                'id' => 8,
                'title' => 'Ley Nro 29944',
            ],
            [
                'id' => 9,
                'title' => 'SIN REGIMEN',
            ],
            [
                'id' => 10,
                'title' => 'D_Leg. Nro 1153',
            ],
            [
                'id' => 12,
                'title' => 'Ley Nro 30328',
            ],
            [
                'id' => 13,
                'title' => 'Ley Nro 30372',
            ],
            [
                'id' => 14,
                'title' => 'Ley Nro 29944_Ley Nro 30493',
            ],
            [
                'id' => 15,
                'title' => 'Ley Nro 30512',
            ],
            [
                'id' => 16,
                'title' => 'Pago Ocasional',
            ],
        ];
    }

    public function getSituaciones(){
        return [
            [
                'id' => 0,
                'title' => 'Sin información',
            ],
            [
                'id' => 1,
                'title' => 'Licencia Sin Goce',
            ],
            [
                'id' => 2,
                'title' => 'Licencia Con Goce ESSALUD',
            ],
            [
                'id' => 3,
                'title' => 'Fallecido',
            ],
            [
                'id' => 4,
                'title' => 'Habilitado',
            ],
            [
                'id' => 5,
                'title' => 'Baja',
            ],
            [
                'id' => 6,
                'title' => 'Licencia Con Goce Otros',
            ],
            [
                'id' => 7,
                'title' => 'Remuneracion Vacacional',
            ],
            [
                'id' => 8,
                'title' => 'Abandono de Cargo',
            ],
            [
                'id' => 9,
                'title' => 'Suspension por Sancion',
            ],
            [
                'id' => 10,
                'title' => 'Rec. para efecto de pago',
            ],
            [
                'id' => 11,
                'title' => 'Medida Preventiva',
            ],
            [
                'id' => 18,
                'title' => 'Suspendido',
            ],
            [
                'id' => 55,
                'title' => 'Pago Ocasional',
            ],
        ];
    }

    public function getCodeFiscales(){
        return [
            [
                'id' => 0,
                'title' => 'Sin información',
            ],
            [
                'id' => 1,
                'title' => 'Ley 20530',
            ],
            [
                'id' => 2,
                'title' => 'Ley 19990',
            ],
            [
                'id' => 3,
                'title' => 'AFP',
            ],
            [
                'id' => 4,
                'title' => 'Pensionista AFP',
            ],
            [
                'id' => 8,
                'title' => 'Ley 20530-Pensiones',
            ],
            [
                'id' => 9,
                'title' => 'D.S.051-88-PCM',
            ],
        ];
    }


    public function getTitleServidor(int $id): string{
        $servidor = collect($this->getTipoServicios())
                        ->firstWhere('id', $id);
        
        return collect($servidor)
            ->get('title');
    }

    public function getTitleRegimenLaboral(int $id): string{
        $regimen = collect($this->getRegimenLaborales())
                        ->firstWhere('id', $id);
        
        return collect($regimen)
            ->get('title');
    }

    public function getTitleCodeFiscal(int $id): string{
        $regimen = collect($this->getCodeFiscales())
                        ->firstWhere('id', $id);
        
        return collect($regimen)
            ->get('title');
    }

    public function getTitleSituacion(int $id): string{
        $situacion = collect($this->getSituaciones())
                        ->firstWhere('id', $id);

        $title = collect($situacion)
            ->get('title');
        
        return "({$id}) {$title}";
    }
}