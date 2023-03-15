import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

interface IDialog {
  trigger: React.ReactNode
  title: string
  description: string
  children: React.ReactNode
  submitButton: React.ReactNode
  open: boolean
  setOpen: any
}

export const Dialog: React.FC<IDialog> = ({
  trigger,
  title,
  description,
  children,
  submitButton,
  open,
  setOpen,
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='bg-gray-800/40 data-[state=open]:animate-overlayShow fixed inset-0' />
        <RadixDialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
          <RadixDialog.Title className='text-black m-0 text-[17px] font-medium'>
            {title}
          </RadixDialog.Title>
          <RadixDialog.Description className='text-gray-700 mt-[10px] mb-5 text-[15px] leading-normal'>
            {description}
          </RadixDialog.Description>
          {children}
          <div className='mt-[25px] flex justify-end'>
            <RadixDialog.Close asChild>{submitButton}</RadixDialog.Close>
          </div>
          <RadixDialog.Close asChild>
            <button
              type='button'
              className='absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none'
              aria-label='Close'
              onClick={() => setOpen(false)}
            >
              <Cross2Icon />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
