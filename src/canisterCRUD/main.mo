import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor CredencialesCRUD {
	


	
    

    type Area = {
		nombre: Text;
	};

    type areaID = Nat32;
	stable var areaID: areaID = 0;

	let listaAreas = HashMap.HashMap<Text, Area>(0, Text.equal, Text.hash);

	private func generaAreaID() : Nat32 {
		areaID += 1;
		return areaID;
	};
	
	
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };



	public shared (msg) func crearArea(nombre: Text) : async () {
		let area = {nombre=nombre};

		listaAreas.put(Nat32.toText(generaAreaID()), area);
		Debug.print("Nueva área creada ID: " # Nat32.toText(areaID));
		return ();
	};

	public query func obtieneAreas () : async [(Text, Area)] {
		let areaIter : Iter.Iter<(Text, Area)> = listaAreas.entries();
		let areaArray : [(Text, Area)] = Iter.toArray(areaIter);

		return areaArray;
	};

	public query func obtieneArea (id: Text) : async ?Area {
		let area: ?Area = listaAreas.get(id);
		return area;
	};

	public shared (msg) func actualizarArea (id: Text, nombre: Text) : async Bool {
		let area: ?Area = listaAreas.get(id);

		switch (area) {
			case (null) {
				return false;
			};
			case (?areaActual) {
				let nuevaArea: Area = {nombre=nombre};
                    listaAreas.put(id, nuevaArea);
                    Debug.print("Area actualizada: " # id);
                    return true;
                };
            };

        };

        public func eliminarArea (id: Text) : async Bool {
            let area : ?Area = listaAreas.get(id);
            switch (area) {
                case (null) {
                    return false;
                };
			case (_) {
				ignore listaAreas.remove(id);
				Debug.print("Área eliminadaD: " # id);
				return true;
			};
		};
	};

// **********************      CRUD Carreras   ********************************************************************//
// ***************************************************************************************************************//
// ***************************************************************************************************************//

    type carreraID = Nat32;
	stable var carreraID: carreraID = 0;

	private func generaCarreraID() : Nat32 {
		carreraID += 1;
		return carreraID;
	};

	 type Carrera = {
		nombre: Text;
		idArea: Nat32;
	};


	let listaCarreras = HashMap.HashMap<Text, Carrera>(0, Text.equal, Text.hash);


	public shared (msg) func crearCarrera(nombre: Text, idArea: Nat32) : async () {
		let carrera = {
			nombre = nombre;
			idArea = idArea
		};

		listaCarreras.put(Nat32.toText(generaCarreraID()), carrera);
		Debug.print("Nueva carrera creada ID: " # Nat32.toText(carreraID));
		return ();
	};

	public query func obtieneCarreras () : async [(Text, Carrera)] {
		let carreraIter : Iter.Iter<(Text, Carrera)> = listaCarreras.entries();
		let carreraArray : [(Text, Carrera)] = Iter.toArray(carreraIter);

		return carreraArray;
	};

	public query func obtieneCarrera (id: Text) : async ?Carrera {
		let carrera: ?Carrera = listaCarreras.get(id);
		return carrera;
	};

	public shared (msg) func actualizarCarrera (id: Text, nombre: Text, idArea: Nat32) : async Bool {
		let carrera: ?Carrera = listaCarreras.get(id);

		switch (carrera) {
			case (null) {
				return false;
			};
			case (?carreraActual) {
				let nuevaCarrera: Carrera = {
					nombre=nombre;
					idArea=idArea
				};
				listaCarreras.put(id, nuevaCarrera);
				Debug.print("Carrera actualizada: " # id);
				return true;
			};
		};

	};

	public func eliminarCarrera (id: Text) : async Bool {
		let carrera : ?Carrera = listaCarreras.get(id);
		switch (carrera) {
			case (null) {
				return false;
			};
			case (_) {
				ignore listaCarreras.remove(id);
				Debug.print("Carrera eliminadaD: " # id);
				return true;
			};
		};
	};

// **********************      CRUD Alumnos   ********************************************************************//
// ***************************************************************************************************************//
// ***************************************************************************************************************//

	public type ImageObject = [Nat8];

	type alumnoID = Nat32;
	type idAlumno = Text;

	stable var alumnoID: alumnoID = 0;
	
	
	private func generaAlumnoID() : Nat32 {
		alumnoID += 1;
		return alumnoID;
	};

	type Alumno = {
		// idAlumno: Principal;
		nombre: Text;
		primerAp: Text;
		segundoAp: Text;
		matricula: Text;
		fechaNacimiento: Text;
		curp: Text;
		idCarrera: Nat32;
		semestre: Nat8;
		sexo: Text;
		idAlumno: Text
		// image: ImageObject;
	};

	let listaAlumnos = HashMap.HashMap<Text, Alumno>(0, Text.equal, Text.hash);


	public shared (msg) func crearAlumno(
			nombre: Text, 
			primerAp: Text, 
			segundoAp: Text, 
			matricula: Text, 
			fechaNacimiento: Text, 
			curp: Text, 
			idCarrera: Nat32, 
			semestre: Nat8, 
			sexo: Text,
			idAlumno: Text
			// image: ImageObject
		) : async () {
		Debug.print("aqui");
		
		// let idAlumno = Principal.fromText(curp # "-" # matricula # "-" # nombre # "-" # primerAp # "-" # segundoAp );
		

		let alumno = {
			// idAlumno = idAlumno;
			nombre = nombre;
			primerAp = primerAp;
			segundoAp = segundoAp;
			matricula = matricula;
			fechaNacimiento = fechaNacimiento;
			curp = curp;
			idCarrera = idCarrera;
			semestre = semestre;
			sexo = sexo;
			idAlumno: idAlumno;
			// image = image
		};

		listaAlumnos.put(Nat32.toText(generaAlumnoID()), 
		alumno);
		Debug.print("Se registró el alumno: "  # Nat32.toText(carreraID));
		return ();
	};

	public query func obtieneAlumnos () : async [(Text, Alumno)] {
		let alumnoIter : Iter.Iter<(Text, Alumno)> = listaAlumnos.entries();
		let alumnoArray : [(Text, Alumno)] = Iter.toArray(alumnoIter);

		return alumnoArray;
	};

	public query func obtieneAlumno (id: Text) : async ?Alumno {
		let alumno: ?Alumno = listaAlumnos.get(id);
		return alumno;
	};

	public shared (msg) func actualizaralumno (
			id: Text,
			nombre: Text, 
			primerAp: Text, 
			segundoAp: Text, 
			matricula: Text, 
			fechaNacimiento: Text, 
			curp: Text, 
			idCarrera: Nat32, 
			semestre: Nat8, 
			sexo: Text,
			idAlumno: Text,
			image: ImageObject

		) : async Bool {

		let alumno: ?Alumno = listaAlumnos.get(id);

		switch (alumno) {
			case (null) {
				return false;
			};
			case (?alumnoActual) {
				let nuevoAlumno: Alumno = {
					// idAlumno = alumnoActual.idAlumno;
					nombre = nombre;
					primerAp = primerAp;
					segundoAp = segundoAp;
					matricula = matricula;
					fechaNacimiento = fechaNacimiento;
					curp = curp;
					idCarrera = idCarrera;
					semestre = semestre;
					sexo = sexo;
					idAlumno = alumnoActual.idAlumno;
					image = image;
				};
				listaAlumnos.put(id, nuevoAlumno);
				Debug.print("alumno actualizada: " # id);
				return true;
			};
		};

	};

	public func eliminarAlumno (id: Text) : async Bool {
		let alumno : ?Alumno = listaAlumnos.get(id);
		switch (alumno) {
			case (null) {
				return false;
			};
			case (_) {
				ignore listaAlumnos.remove(id);
				Debug.print("Alumno eliminadaD: " # id);
				return true;
			};
		};
	};
//////**********************    Termina  CRUD Alumnos   ********************************************************************//

}