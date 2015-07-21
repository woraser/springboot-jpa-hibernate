package charles.entity.system;

import charles.entity.common.DeletedSupportedEntity;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.TABLE;

/**
 * Created by charles.chen on 2015/7/21.
 */
@Entity
@Table(name = "sys_user")
public class User extends DeletedSupportedEntity {

    @Id
    @Column(name = "sys_user_id")
    @GeneratedValue(strategy = TABLE, generator = "sequence_generator")
    @GenericGenerator(
            name = "sequence_generator",
            strategy = "org.hibernate.id.enhanced.TableGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "segment_value", value = "sys"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "100"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled")
            })
    private Long id;

    @Column(name = "user_username", length = 50, nullable = false)
    private String userName;

    @Column(name = "user_accountname", length = 50, nullable = false)
    private String accountName;

    @Column(name = "user_password", length = 50)
    private String password;

    @Column(name = "user_credentialsSalt", length = 200)
    private String credentialsSalt;

    @Column(name = "user_description", length = 200)
    private String description;

    @Column(name = "locked", nullable = false)
    private boolean locked=false;

    @Temporal(TemporalType.DATE)
    @Column(name = "createTime")
    private Date createTime;

    @ManyToMany
    @JoinTable(name = "sys_user_role", joinColumns = @JoinColumn(name = "sys_user_id"), inverseJoinColumns = @JoinColumn(name = "sys_role_id"))
    private List<Role> roles;

    @ManyToMany
    @JoinTable(name = "sys_user_premission", joinColumns = @JoinColumn(name = "sys_user_id"), inverseJoinColumns = @JoinColumn(name = "sys_premission_id"))
    private List<Premission> premissions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCredentialsSalt() {
        return credentialsSalt;
    }

    public void setCredentialsSalt(String credentialsSalt) {
        this.credentialsSalt = credentialsSalt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<Premission> getPremissions() {
        return premissions;
    }

    public void setPremissions(List<Premission> premissions) {
        this.premissions = premissions;
    }
}
