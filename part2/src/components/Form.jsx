import { Button } from './Button'

export const Form = ({ inputs, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {inputs.map((input) => (
          <div key={input.label}>
            {input.label} :{' '}
            <input value={input.value} onChange={input.onChange} />
          </div>
        ))}
      </div>
      <Button label={'Add person'} />
    </form>
  )
}
