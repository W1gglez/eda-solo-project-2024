import { useState } from 'react';
import { IconButton, Typography, Sheet } from '@mui/joy';
import { DragHandle } from '@mui/icons-material';
import EditSetInfoDisplay from '../EditSetInfoDisplay/EditSetInfoDisplay';

export default function SetInfoDisplay({ s, i, isEditable, setIsEditable }) {
  const [editSet, setEditSet] = useState(false);
  const [updatedSet, setUpdatedSet] = useState({ ...s });
  const editBtn = document.getElementById('edit-btn');

  return editSet ? (
    <EditSetInfoDisplay
      s={s}
      key={i}
      updatedSet={updatedSet}
      setUpdatedSet={setUpdatedSet}
      setEditSet={setEditSet}
      editBtn={editBtn}
    />
  ) : (
    <tr>
      <td>
        <Sheet sx={{ bgcolor: 'inherit', display: 'flex' }}>
          <Typography
            sx={{ flex: 1, alignContent: 'center' }}
            level='body-md'
          >
            <Typography sx={{ fontWeight: 600 }}>
              Set {s.set_number}:
            </Typography>{' '}
            {s.reps} reps @ {s.weight} lbs
          </Typography>
          {isEditable && (
            <IconButton
              size='sm'
              sx={{ flex: 0 }}
              onClick={() => {
                editBtn.disabled = true;
                setEditSet(true);
                setIsEditable(false);
              }}
            >
              <DragHandle />
            </IconButton>
          )}
        </Sheet>
      </td>
    </tr>
  );
}
