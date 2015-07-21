package charles.entity.common;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

/**
 * Created by charles.chen on 2015/7/21.
 */
@MappedSuperclass
public abstract class DeletedSupportedEntity{
    @Column(
            name = "deletestatus",
            nullable = false
    )
    private boolean deletestatus = false;

    public DeletedSupportedEntity() {
    }

    public boolean isDeletestatus() {
        return deletestatus;
    }

    public void setDeletestatus(boolean deletestatus) {
        this.deletestatus = deletestatus;
    }
}