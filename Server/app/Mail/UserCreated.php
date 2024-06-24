<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserCreated extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $originalPassword;

    /**
     * Create a new message instance.
     *
     * @param User $user
     */
    public function __construct(User $user, $originalPassword)
    {
        $this->user = $user;
        $this->originalPassword = $originalPassword;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.user_created')
        ->subject('User Created')
        ->with([
            'user' => $this->user,
            'originalPassword' => $this->originalPassword,
        ]); // Set the email subject
    }
}    
