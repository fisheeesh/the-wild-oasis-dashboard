import usePageTitle from '../../hooks/usePageTitle';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isPending, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } = useSettings()

  const { updateSetting, isUpdating } = useUpdateSetting()

  usePageTitle(`Settings`)

  const handleUpdate = (e, field) => {
    const { value } = e.target

    if (!value) return

    updateSetting({
      [field]: value
    })
  }

  if (isPending) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'minBookingLength')} type='number' id='min-nights' defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'maxBookingLength')} type='number' id='max-nights' defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')} type='number' id='max-guests' defaultValue={maxGuestsPerBooking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input disabled={isUpdating} onBlur={(e) => handleUpdate(e, 'breakfastPrice')} type='number' id='breakfast-price' defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
