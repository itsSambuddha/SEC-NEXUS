import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type

    if(eventType === 'user.created') {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;
      
      // Handle user.created event
      const user = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address || '',
        firstName: first_name || '',
        lastName: last_name || '',
        username: username || '',
        photo: image_url || ''
      }
      
      const newUser = await createUser(user);
      
      if(newUser) {
        // Do something with the newly created user
        const client = await clerkClient()
        await client.users.updateUserMetadata(id || '', {
          publicMetadata: {
            userId: newUser._id
          }
        })
      }

      return NextResponse.json({ status: 'Success', user: newUser })
    }

     if (eventType === 'user.updated') {
    const {id, image_url, first_name, last_name, username } = evt.data

    const user = {
      firstName: first_name || '',
      lastName: last_name || '',
      username: username || '',
      photo: image_url || '',
    }

    const updatedUser = await updateUser(id || '', user)

    return NextResponse.json({ message: 'Success', user: updatedUser })
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    const deletedUser = await deleteUser(id!)

    return NextResponse.json({ message: 'Success', user: deletedUser })
  }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
