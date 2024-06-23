<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\DoctorReauest;
use App\Http\Requests\request as RequestsRequest;
use App\Http\Requests\updateDoctor;
use App\Models\Doctor;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\JsonResponse;


class doctorController extends Controller
{
     /**
     * Create a new doctor instance.
     *
     * @param  \App\Http\Requests\DoctorRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */

     public function AddDoctor(DoctorReauest  $request):JsonResponse{
        $validatedData = $request-> validated();
        $doctor = Doctor::create($validatedData);
        return response() ->json([
            'status'=>true,
            'massage' =>'Doctor created successfully',
            "data" => $doctor

        ],201);

     }


     /**
      * update doctor
      *@param  \App\Http\Requests\DoctorRequest  $request
     * @return \Illuminate\Http\JsonResponse  
     * @param  int  $id
     *     
      */
      public function update(updateDoctor $request, $id)
      {
          $doctor = Doctor::find($id);
      
          if (!$doctor) {
              return response()->json(['message' => 'Doctor not found'], 404);
          }
      
          // Validate the incoming request data
          $validatedData = $request->validated();
      
          // Check if email field is provided and unchanged from initial data
          if (isset($validatedData['email']) && $validatedData['email'] === $doctor->email) {
              // Remove email from validated data if unchanged
              unset($validatedData['email']);
          }
      
          // If email is being updated, validate it for uniqueness
          if (array_key_exists('email', $validatedData)) {
              $request->validate([
                  'email' => ['required', 'email', 'max:255']
              ]);
          }
      
          // Update the doctor record
          $doctor->update($validatedData);
          $updatedDoctor = Doctor::findOrFail($id);
      
          return response()->json($updatedDoctor, 200);
      }
      




     /**
      * get all doctors
      *
     * @return \Illuminate\Http\JsonResponse
      */
      public function gettAllDoctors(): JsonResponse{
        $allDoctors = Doctor::all();
        return response()->json($allDoctors);
      }


      /**
       * get doctor by id
       * 
       * @param  int  $id
       * @return \Illuminate\Http\JsonResponse
       */
      public function show($id): JsonResponse{
        $doctor = Doctor::find($id);
        if(!$doctor){
            return response()->json(['massage'=>'Doctor not found'],200);
        }else{
            return response()-> json($doctor);
        }
      }

      /**
       * delete doctor 
       * 
       * @param  int  $id
       * @return \Illuminate\Http\JsonResponse
       */  
      public function destroy($id):JsonResponse{
        $doctor = Doctor::find($id);
        if(!$doctor){
            return response()->json(['message' => 'Doctor has already been deleted'], 200);
        }
            // Delete the user
            $doctor->delete();
            // Return a JSON response with a success message
            return response()->json(['message' => 'Doctor has been deleted successfully'], 200);
    

}



public function search(Request $request, $username)
{
    // Initialize the query to retrieve all doctors
    $query = Doctor::query();

    // Query doctors based on name search
    if ($username) {
        // Concatenate first_name and last_name with a space and then search
        $fullName = str_replace('-', ' ', $username); // Handle potential dashes
        $query->whereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%$fullName%"]);
    }

    // Execute the query and get the result
    $doctors = $query->get();

    // Check if any doctors were found
    if ($doctors->isEmpty()) {
        return response()->json(['message' => 'No doctors found with the specified name'], 404);
    }

    // Transform the data as needed
    $result = $doctors->map(function ($doctor) {
        return [
            'id' => $doctor->id,
            'first_name' => $doctor->first_name,
            'last_name' => $doctor->last_name,
            'state' => $doctor->state,
            'city' => $doctor->city,
            'street' => $doctor->street,
            'phone_number' => $doctor->phone_number,
            'territory' => $doctor->territory,
            'email' => $doctor->email,
            'specialization' => $doctor->specialization,
            'class_rate' => $doctor->class_rate,
        ];
    });

    // Return the transformed result as JSON response
    return response()->json($result);
}
}