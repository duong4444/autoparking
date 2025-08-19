import { SearchGaragesQueryVariables } from '@autospace/network/src/gql/generated'
import { FormTypeSearchGarage } from '../searchGarages'
import { useState, useEffect } from 'react'
import {
  FieldNamesMarkedBoolean,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useDebounce } from '@autospace/util/hooks/async'
import { intFilter } from './util'

// type từ schema
type FormData = Partial<
  Pick<
    FormTypeSearchGarage,
    | 'endTime'
    | 'startTime'
    | 'height'
    | 'length'
    | 'width'
    | 'pricePerHour'
    | 'type'
    | 'locationFilter'
    | 'skip'
    | 'take'
  >
>

// hook return giá trị để filter garage
export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<any>(null)

  // dirty field return true nếu value đã thay đổi so vs default value
  const {
    formState: { dirtyFields, errors },
  } = useFormContext<FormTypeSearchGarage>()
  // lấy current value của các trường trong form SearchGarage
  const formData = useWatch<FormTypeSearchGarage>()
  // lấy debounce value
  const [debouncedFormData, { debouncing }] = useDebounce(formData, 300)

  const hasErrors = Object.keys(errors).length !== 0

  console.log("hasError: ",hasErrors);
  

  useEffect(() => {
    // destruct từ debounce 
    const {
      endTime,
      startTime,
      locationFilter,
      length,
      width,
      height,
      pricePerHour,
      type,
      skip,
      take,
    } = debouncedFormData

    // ko có trường bắt buộc thì return
    if (!startTime || !endTime || !locationFilter) {
      return
    }
    
    // obj dateFilter
    const dateFilter: SearchGaragesQueryVariables['dateFilter'] = {
      start: startTime,
      end: endTime,
    }

    // const { ne_lat = 0, ne_lng = 0, sw_lat = 0, sw_lng = 0 } = locationFilter

    // obj slotsFilter
    const slotsFilter = createSlotsFilter(dirtyFields, {
      length,
      width,
      height,
      pricePerHour,
      type,
    })

    // obj garageFilter
    const garageFilter = createGaragesFilter(dirtyFields, { skip, take })

    // set cho varible
    setVariables({
      dateFilter,
      locationFilter,
      ...(Object.keys(slotsFilter).length && { slotsFilter }),
      ...(Object.keys(garageFilter).length && { garageFilter }),
    })
  }, [debouncedFormData])

  return { variables: hasErrors ? null : variables, debouncing }
}

export const createSlotsFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const length = dirtyFields.length && intFilter(formData.length)
  const width = dirtyFields.width && intFilter(formData.width)
  const height = dirtyFields.height && intFilter(formData.height)
  const pricePerHour =
    dirtyFields.pricePerHour && intFilter(formData.pricePerHour)
  const type = dirtyFields.type && { in: formData.type }
  console.log("type in createSlotFilter: ",type);
  

  return {
    ...(length && { length }),
    ...(width && { width }),
    ...(height && { height }),
    ...(pricePerHour && { pricePerHour }),
    ...(type && { type }),
  }
}

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchGarage>,
  formData: FormData,
) => {
  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 50

  return {
    ...(skip && { skip }),
    ...(take && { take }),
  }
}
