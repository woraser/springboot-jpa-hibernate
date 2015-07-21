package charles.entity.system;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.TABLE;

/**
 * Created by charles.chen on 2015/7/21.
 */

@Entity
@Table(name = "sys_role")
public class Role {

    @Id
    @Column(name = "sys_role_id")
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

    @Column(name = "sys_role_name",length = 50)
    private String  name;

    @Column(name = "sys_role_state",length = 3)
    private String state;

    @Column(name = "sys_role_roleKey",length = 50)
    private String roleKey;

    @Column(name = "sys_role_description",length = 200)
    private String description;

    @ManyToMany(mappedBy = "roles")
    private List<User> user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRoleKey() {
        return roleKey;
    }

    public void setRoleKey(String roleKey) {
        this.roleKey = roleKey;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }
}
