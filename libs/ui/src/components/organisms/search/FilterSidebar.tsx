import {
  FormTypeSearchGarage,
  formDefaultValuesSearchGarages,
} from '@autospace/forms/src/searchGarages';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '../../atoms/Button';
import { IconFilter } from '@tabler/icons-react';
import { PulsingDot } from '../../atoms/Dot';
import { Sidebar } from '../Sidebar';
import { RangeSlider } from '../../molecules/RangeSlider';
import {
  ToggleButtonGroup,
  ToggleButton,
} from '../../molecules/ToggleButtonGroup';
import { FilterHeading } from '../../molecules/FilterHeading';
import { IconTypes } from '../../molecules/IconTypes';

export const FilterSidebar = () => {
  const [open, setOpen] = useState(false);
  // useFormContext để access vào state và method của form
  const {
    control, // manage form input , dùng cho <Controller>
    reset, // reset form value tới giá trị cụ thể
    getValues, // lấy current form value
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchGarage>();

  return (
    <>
      <Button
        size="sm"
        variant="text"
        onClick={() => setOpen(true)}
        className=" hover:bg-gray-200"
      >
        <IconFilter className="stroke-1.5 text-black" />
        {Object.values(dirtyFields).length ? <PulsingDot /> : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen} blur={false}>
        <div className="flex flex-col items-start gap-3">
          <Controller 
            //  binds to the types field in the form
            name="type"
            // links to the forms control obj
            control={control}
            // define how the field is rendered , nhan value(default = [])
            render={({
              field: { value = [], onChange }, // value = [] tức là chưa p_tiện nào đc chọn , value ban đầu là default value
              fieldState: { isDirty },
              formState: { defaultValues }, // giá trị default
            }) => {
               console.log('value at render:', value);
              return (
                
                <div>
                  <FilterHeading dirty={isDirty} title="Vehicle type" />
                  <ToggleButtonGroup
                    value={value} // gtri hien tai cua truong(mang loai ptien da chon)
                    onChange={(_, value) => {
                      onChange(value.sort());
                    }}
                    aria-label="text formatting"
                  > 
                    {defaultValues?.type?.map((val) => {
                      if (!val) return null;
                      return (
                        <ToggleButton
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        > 
                          <p>{val}{'-'}</p>
                          {IconTypes[val]}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                </div>
              );
            }}
          />
          <Controller
            name="pricePerHour"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Price per hour" />
                  <RangeSlider
                    min={defaultValues?.pricePerHour?.[0]}
                    max={defaultValues?.pricePerHour?.[1]}
                    // max={200}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `$ ${sliderValue.toLocaleString()}`
                    }
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="width"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Width" />
                  <RangeSlider
                    min={defaultValues?.width?.[0]}
                    max={defaultValues?.width?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="height"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Height" />
                  <RangeSlider
                    min={defaultValues?.height?.[0]}
                    max={defaultValues?.height?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Controller
            name="length"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Length" />
                  <RangeSlider
                    min={defaultValues?.length?.[0]}
                    max={defaultValues?.length?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={1}
                  />
                </div>
              );
            }}
          />
          <Button
            onClick={() =>
              reset({ ...getValues(), ...formDefaultValuesSearchGarages })
            }
            disabled={!Object.values(dirtyFields).length}
          >
            Reset
          </Button>
        </div>
      </Sidebar>
    </>
  );
};
