@component('mail::message')
 Welcome {{ $user->first_name }} {{ $user->last_name }} to Our Platform 


We are excited to welcome you to our platform! Here are your registration details:

- First Name: {{ $user->first_name }}
- Last Name: {{ $user->last_name }}
- Phone Number: {{ $user->phone_number }}
- Email: {{ $user->email }}
- password: {{$user ->password}}
- Location: {{ $user->city }}, {{ $user->state }}, {{ $user->territory }}

Thank you for being a part of our community.

Regards,  
The REPALERT Team
This is a system-generated email. Please do not reply
@endcomponent
