/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import React, { Ref } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import type { SelectProps } from '@radix-ui/react-select'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from '@radix-ui/react-icons'

interface ISelect extends SelectProps {
  options: string[]
  placeholder: string
  filter: string
  setFilter: React.SetStateAction<any>
  noDefault: boolean
}

const SelectItem = React.forwardRef(
  (
    {
      children,
      value,
      ...props
    }: { children: React.ReactNode; value: string; props?: any },
    forwardedRef
  ) => {
    return (
      <RadixSelect.Item
        className='text-[13px] cursor-pointer leading-none text-gray-700 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative RadixSelect-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-gray-200 data-[highlighted]:text-gray-900'
        value={value}
        data-testid='select-item'
        {...props}
        ref={forwardedRef as Ref<HTMLDivElement>}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className='absolute left-0 w-[25px] inline-flex items-center justify-center'>
          <CheckIcon />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    )
  }
)

export const Select: React.FC<ISelect & SelectProps> = ({
  filter,
  setFilter,
  options,
  placeholder,
  noDefault,
}) => {
  return (
    <div>
      <RadixSelect.Root value={filter} onValueChange={setFilter}>
        <RadixSelect.Trigger
          className='inline-flex border w-40 sm:w-48 border-gray-300 items-center justify-between rounded px-[15px] text-[13px] leading-none h-[32px] gap-[5px] bg-white text-gray-700 shadow-[0_2px_10px] shadow-black/10 hover:bg-gray-10 hover:border-gray-400 data-[placeholder]:text-gray-500 outline-none'
          aria-label='Order Type'
          data-testid='select'
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className='text-gray-500'>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content className='overflow-hidden rounded-sm bg-gray-50 drop-shadow-md'>
            <RadixSelect.ScrollUpButton className='flex items-center justify-center h-[25px] bg-white text-gray-500 cursor-default'>
              <ChevronUpIcon />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport className='p-[5px]'>
              {!noDefault && <SelectItem value=''>Order Type</SelectItem>}

              {options.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton className='flex items-center justify-center h-[25px] bg-white text-gray-500 cursor-default'>
              <ChevronDownIcon />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}
